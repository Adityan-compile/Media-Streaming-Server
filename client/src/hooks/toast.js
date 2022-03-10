import emitter from "../store/services/emitter";

function useToast() {
  const show = (config = {}) => {
    emitter.emit("show-toast", config);
  };
  return { current: { show } };
}

export default useToast;
