import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data.js';


const Quiz = () => {
    let [index,setIndex]=useState(0);
    let [question,setquestion]=useState(data[index])
    let [lock,setLock]=useState(false);
    let [score,setScore]=useState(0);
    let [result,setResult]=useState(0);
    let option1=useRef(null);
    let option2=useRef(null);
    let option3=useRef(null);
    let option4=useRef(null);

    let opt_arr=[option1,option2,option3,option4]
    const checkAns=(e,ans)=>
        {
        if(lock===false)
        {
            if(question.ans==ans)
            {
                e.target.classList.add('correct');
                setLock(true);
                setScore(prev=>prev+1);
            }               
            else
            {
            e.target.classList.add('incorrect');
            setLock(true);
            }
        }
        
    }
    const  next =()=>{
        if(lock===true){
            if(index===data.length-1){
                setResult(true);
                return null;
            }
        setIndex(++index);
        setquestion(data[index]);
        setLock(false);
        opt_arr.map((option)=>{
            option.current.classList.remove('incorrect');
            option.current.classList.remove('correct');
            return null;
        })
        }
    }
    const reset=()=>{
        setIndex(0);
        setquestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false)
    }
      return (
    <div className='container'>
        <h1>Quiz app</h1>
        <hr />
        {result?<></>:<>
            <h2>{index+1}.{question.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
            <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">{index+1} of {data.length} questions</div></>}
        {
            result?<><h2>Congratulation!! You scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button></>:<></>
        }
        
        
    </div>
  )
}

export default Quiz