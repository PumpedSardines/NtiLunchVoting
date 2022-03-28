import React, { useEffect, useState } from 'react'
import { selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { _allOptions, _people, _person, _selectedOption } from '../../state';

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

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

function useResize() {
    const [aspect, setAspect] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const event = () => {
            setAspect([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener("resize", event);
        return () => window.removeEventListener("resize", event);
    }, []);

    return aspect;
}

export default function Random() {
    const [blocks, setBlocks] = useState(null as string[] | null);
    const allOptions = useRecoilValue(_allOptions);
    const selectedOption = useRecoilValue(_selectedOption);
    const [finished, setFinished] = useState(false);

    const [width, height] = useResize();

    useEffect(() => {

        const newBlocks = new Array(5 * 7).fill(0).map(() => {

            return allOptions[~~(Math.random() * allOptions.length)];
        });

        if (selectedOption) {
            newBlocks[2] = selectedOption;
        }

        setBlocks(newBlocks);

    }, [allOptions, selectedOption]);

    useEffect(() => {

        document.body.style.overflowY = "hidden";
        const id = setTimeout(() => setFinished(true), 3000)

    }, []);


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
            <div id="random" style={{height: `${height}px`}}>

                {blocks.map((v, i) => {

                    return <div key={i} className={"random-block" + (finished && i === 2 ? " blink" : "")} style={{
                        backgroundColor: colors[(offset + i) % colors.length],
                        height: `${height / 5}px`
                    }}>
                        <p>{v}</p>
                    </div>

                })}

            </div>
        </>

    )
}

function RandomBlock(props: { color: string, name: string }) {

}