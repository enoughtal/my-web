import { useEffect, useState } from "react"
import Category from "../Category"
import "./index.sass"

export default function DropdownCategory() {
    const [dropdown, setDropdown] = useState(false)
    const [isWaiting, setIsWaiting] = useState(true)
    const foo = 'bar'
    useEffect(() => {
        setTimeout(() => setIsWaiting(false), 3000)
        console.log(foo)
        return () => {
            clearTimeout()
            setIsWaiting(true)
        }
    }, [])

    return (
        <div onMouseLeave={() => setDropdown(false)}>
            <div onClick={() => setDropdown(true)}
                className='myapp-comp-dropdowncategory-button'
            >
                {isWaiting ? <div>Loading...</div> : <div>Catalog&gt;&gt;</div>}
            </div>
            {dropdown &&
            <div className='myapp-comp-dropdowncategory-files'>
                <Category />
            </div>}
        </div>
    )
}