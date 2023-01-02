import { useEffect, useState } from 'react'
import styles from './Select.module.css'

type SelectProps = {
    options:SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

type MultipleSelectProps={
    multiple:true
    value:SelectOption[]
    onChange:(value:SelectOption[])=>void
}

type SingleSelectProps={
    multiple?:false
    value?:SelectOption
    onChange:(value:SelectOption | undefined)=>void
}

export type SelectOption={
    label:string
    value:string | number
}

export function Select({multiple,value,onChange, options}: SelectProps){
    const [isOpen, setIsOpen]=useState(false)
    const[highLightedIndex,setHighLightedIndex]=useState(0)


    function clearOptions(){
        multiple ? onChange([]): onChange(undefined)
    }

    function selectOption(option:SelectOption){
        if(multiple){
            if(value.includes(option)){
                onChange(value.filter(o => o !== option))
            }else{
                onChange([...value, option])
            }
        }
        else{
            if(option !== value) onChange(option)
        }
        
    }

    function isOptionSelected(option:SelectOption){
        return multiple? value.includes(option) : option === value;
    }

    useEffect(()=>{
        if(isOpen) setHighLightedIndex(0)
    },[isOpen])
    return (
        <div
        onBlur={()=>setIsOpen(false)}
        onClick={()=>setIsOpen(prev=>!prev)}
        tabIndex={0} className={styles.container}>
            <span className={styles.value}>
                {multiple?value.map(v=>(
                    <button 
                    key={v.value} 
                    onClick={e=>{
                        e.stopPropagation()
                        selectOption(v)
                    }}
                    className={styles['option-badge']}
                    >
                        {v.label}
                        <span className={styles['remove-btn']}>&times;</span>
                    </button>
                )):value?.label}
            </span>
            <button 
            onClick={e=>{
                e.stopPropagation()
                clearOptions()
            }}
            className={styles['clear-btn']}>
                &times;
            </button>
            <div className={styles.divider}></div>
            <div className={styles.caret}> + </div>
            <ul className={`${styles.options} ${isOpen?styles.show:''}`}>
                {
                    options.map((option,index)=>(
                      <li
                      onMouseEnter={()=>setHighLightedIndex(index)}
                        key={option.value}
                        onClick={e=>{
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                        className={`${styles.option} ${isOptionSelected(option)? styles.selected:''} ${index===highLightedIndex? styles.highlighted:''}`}>{option.label}
                        </li>

                    ))
                }
            </ul>
        </div>
    )
}