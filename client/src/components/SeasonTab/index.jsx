import { Accordion, AccordionTab } from "primereact/accordion";

import styles from "./styles.module.css"

function SeasonTab({ data }) {
    return (
        <Accordion>
            {
                data.seasons.map((el) => (
                    <AccordionTab key={el.id} header={`Season ${el.season_number}`} >
                        {
                            el.episodes.map(episode => (
                                <div>
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