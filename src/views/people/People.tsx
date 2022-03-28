import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil'
import Person from './Person'
import { _allOptions, _people, _person, _selectedOption, _selectedPerson, _view } from '../../state'
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react';

function People() {
    const [people, setPeople] = useRecoilState(_people);

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
        const allOptions = await snapshot.getPromise(_allOptions);

        if(allOptions.length === 0) {
            return alert("Du måste välja några resturanger");
        }

        const people = await snapshot.getPromise(_people);

        const personId = people[~~(Math.random() * people.length)];

        const person = await snapshot.getPromise(_person(personId));

        const option = person.options[~~(Math.random() * person.options.length)];

        set(_selectedPerson, person.name)
        set(_selectedOption, option);
        set(_view, "random");
    });

    return (<>
        <div className='buttons top'>
            <button onClick={() => {
                setPeople([uuid(), ...people]);
            }}>Lägg till person</button>

            <button onClick={setRandomRestaurant}>Slumpa</button>
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
