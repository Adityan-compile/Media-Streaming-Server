const os = require("os");
const disk = require("check-disk-space").default;
const sysInfo = require("systeminformation");

exports.isIncluded = (arr1, arr2) => arr2.every((v) => arr1.includes(v));

exports.getServerStats = () => {
  return new Promise(async (resolve, reject) => {
    const cpus = os.cpus();
    const load = os.loadavg();

    const cpu = {
      load1: load[0],
      load5: load[1],
      load15: load[2],
      cores: Array.isArray(cpus) ? os.cpus().length : null,
    };
    cpu.utilization = Math.min(Math.floor((load[0] * 100) / cpu.cores), 100);

     cpu.temp = await sysInfo.cpuTemperature();

    //Calculate Disk and Memory Usage Percentages
    const memoryUsage = Math.round(
      ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
    );

    const rawDiskUsage = await disk("/");
    const diskUsage = Math.round(
      ((rawDiskUsage.size - rawDiskUsage.free) / rawDiskUsage.size) * 100
    );

    resolve({
      uptime: os.uptime(),
      loadAverage: os.loadavg(),
      platform: os.platform(),
      freeMem: os.freemem(),
      totalMem: os.totalmem(),
      memUsage: memoryUsage,
      diskUsage,
      cpu,
    });
  });
};
