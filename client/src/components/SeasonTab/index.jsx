import { Accordion, AccordionTab } from "primereact/accordion";

import { Button } from "primereact/button";
import styles from "./styles.module.css";

function SeasonTab({ data }) {
    return (
        <Accordion>
            {
                data.seasons.map((el) => (
                    <AccordionTab key={el.id} header={`Season ${el.season_number}`}>
                        <div className="grid">
                            {
                                el.episodes.map(episode => (
                                    <div className={["container", styles.episodeCard].join(" ")}>
                                        <div>
                                            <img
                                                src={
                                                    (!episode.still_path || episode.still_path.length === 0) ?
                                                        "https://bitsofco.de/content/images/2018/12/broken-1.png" :
                                                        `https://www.themoviedb.org/t/p/original${episode.still_path}`
                                                }
                                                alt=""
                                                className={styles.still} />
                                        </div>
                                        <div className="m-20">
                                            <h4>{episode.name}</h4>
                                            <Button label="Play" icon="pi pi-play" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </AccordionTab>
                ))
            }
        </Accordion>
    )
}

export default SeasonTab;