import React, { useEffect } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { _people, _person } from '../../state'

export default function Person(props: { id: string }) {

    const [person, setPerson] = useRecoilState(_person(props.id));

    // Load on first
    useEffect(() => {

        try {
            setPerson(JSON.parse(localStorage.getItem("person-" + props.id) ?? "non json decodable"));
        } catch (err) {
            console.log("Couldn't load save, skipping...");
        }

    }, []);

    // Save on change
    useEffect(() => {

        localStorage.setItem("person-" + props.id, JSON.stringify(person));

    }, [person]);

    /**
     * Removes this current person
     */
    const removeThisPerson = useRecoilCallback(({ snapshot, set }) => async () => {
        const people = await snapshot.getPromise(_people);
        set(_people, people.filter(v => v !== props.id));
    });

    return (
        <div className="person">

            <input
                className='name'
                value={person.name}
                onChange={e => setPerson({
                    ...person,
                    name: e.currentTarget.value
                })}
                placeholder='Namn'
                type="text"
            />
            <div className='buttons'>
                <button onClick={() => {
                    setPerson({
                        ...person,
                        options: [...person.options, ""]
                    })
                }}>
                    Lägg till val
                </button>
                <button onClick={removeThisPerson}>
                    Ta bort
                </button>
            </div>

            <div className='options'>
                {person.options.map((v, i) => {

                    return <div key={i} className='option'>
                        <input placeholder='Resturang' value={v} onChange={(e) => {

                            const newOptions = JSON.parse(JSON.stringify(person.options));
                            newOptions[i] = e.currentTarget.value;

                            setPerson({
                                ...person,
                                options: newOptions
                            });

                        }} type="text" />
                        <div className="buttons">
                            <button onClick={() => {

                                setPerson({
                                    ...person,
                                    options: person.options.filter((v, j) => j !== i)
                                });

                            }}>
                                Ta bort
                            </button>
                        </div>
                    </div>

                })}
            </div>
        </div>
    )
}
