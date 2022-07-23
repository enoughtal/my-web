import { useSelector } from 'react-redux'
import { themeClass } from '../../tools/helper'
import './index.sass'
import TodosForm from "./TodosForm"
//import TodosTable from "./TodosTable"

export default function Todos() {
    const theme = useSelector(state => state.user.preference.theme)

    return (
        <>
            <div className={themeClass(theme, 'myapp-todos-form-container')}>
                <TodosForm />
            </div>
            <div className={themeClass(theme, 'myapp-todos-table-container')}>
                {/*<TodosTable />*/}
                world
            </div>
        </>
    )
}