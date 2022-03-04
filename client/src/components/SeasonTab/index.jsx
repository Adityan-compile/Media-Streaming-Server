import { Accordion, AccordionTab } from "primereact/accordion";

import styles from "./styles.module.css";

function SeasonTab({ data }) {
    console.log(data.seasons[0].episodes[0]);
    return (
        <Accordion>
            {
                data.seasons.map((el) => (
                    <AccordionTab key={el.id} header={`Season ${el.season_number}`} >
                        {
                            el.episodes.map(episode => (
                                <div className={["container", styles.episodeCard].join(" ")}>
                                    <img src={`https://www.themoviedb.org/t/p/original${episode.still_path}`} alt="" className={styles.still} />
                                    {episode.name}
                                </div>
                            ))
                        }
                    </AccordionTab>
                ))
            }
        </Accordion>
    )
}

export default SeasonTab;