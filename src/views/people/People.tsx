import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil'
import Person from './Person'
import { _people, _person, _selectedOption, _view } from '../../state'
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';

function People() {
    const [people, setPeople] = useRecoilState(_people);
    const setView = useSetRecoilState(_view);

    // Load on first
    useEffect(() => {

        try {
            setPeople(JSON.parse(localStorage.getItem("people") ?? "non json decodable"));
        } catch (err) {
            console.log("Couldn't load save, skipping...");
        }

    }, []);

    // Save on change
    useEffect(() => {

        localStorage.setItem("people", JSON.stringify(people));

    }, [people]);

    const setRandomRestaurant = useRecoilCallback(({ snapshot, set }) => async () => {
        const people = await snapshot.getPromise(_people);

        const personId = people[~~(Math.random() * people.length)];

        const person = await snapshot.getPromise(_person(personId));

        const option = person.options[~~(Math.random() * person.options.length)];

        set(_selectedOption, option);
    });

    return (<>
        <div className='buttons top'>
            <button onClick={() => {
                setPeople([...people, uuid()]);
            }}>Lägg till person</button>
            
            <button onClick={() =>
                setRandomRestaurant().then(() => setView("random"))
            }>Slumpa</button>
        </div>
        {
            people.map(v => {
                return <Person key={v} id={v} />
            })
        }
    </>
    )
}

export default People
