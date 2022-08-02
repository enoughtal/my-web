import { useSelector } from 'react-redux'
import { themeClass } from '../../tools/helper/index.js'
import './index.sass'
import TodosForm from "./TodosForm/index.jsx"
import TodosTable from "./TodosTable/index.jsx"

export default function Todos() {
    const theme = useSelector(state => state.user.preference.theme)

    return (
        <>
            <div className={themeClass(theme, 'myapp-todos-form-container')}>
                <TodosForm />
            </div>
            <div className={themeClass(theme, 'myapp-todos-table-container')}>
                <TodosTable />
            </div>
        </>
    )
}