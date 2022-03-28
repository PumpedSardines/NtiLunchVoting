import React, { useEffect, useState } from 'react'
import { selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { _people, _person, _selectedOption } from '../../state';

const _allOptions = selector({
    key: "_allOptions",
    get: ({ get }) => {
        const people = get(_people);
        const options: string[] = [];

        people.forEach(personId => {

            options.push(...get(_person(personId)).options);

        });

        return options;
    }
});

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export default function Random() {
    const [blocks, setBlocks] = useState(null as string[] | null);
    const allOptions = useRecoilValue(_allOptions);
    const selectedOption = useRecoilValue(_selectedOption);


    useEffect(() => {

        const newBlocks = new Array(5 * 7).fill(0).map(() => {

            return allOptions[~~(Math.random() * allOptions.length)];
        });

        if (selectedOption) {
            newBlocks[2] = selectedOption;
        }

        setBlocks(newBlocks);

    }, [allOptions, selectedOption]);


    const colors = useState(shuffle([
        "#1B5299",
        "#BF0603",
        "#8FA253",
        "#F4E409",
        "#FC9E4F"
    ]))[0];

    const offset = useState(~~(Math.random() * colors.length))[0];

    if (blocks === null) {
        return <></>
    }

    console.log(selectedOption);

    return (
        <>
            <div className='arrow'>

            </div>
            <div id="random">

                {blocks.map((v, i) => {

                    return <div key={i} className="random-block" style={{
                        backgroundColor: colors[(offset + i) % colors.length]
                    }}>
                        {v}
                    </div>

                })}

            </div>
        </>

    )
}

function RandomBlock(props: { color: string, name: string }) {

}