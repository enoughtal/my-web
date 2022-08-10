import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { themeClass } from '../../tools/helper'
import './index.sass'
import TodosForm from "./TodosForm"
const TodosTable = lazy(() => import('./TodosTable'))

export default function Todos() {
    const theme = useSelector(state => state.user.preference.theme)

    return (
        <>
            <div className={themeClass(theme, 'myapp-todos-form-container')}>
                <TodosForm />
            </div>
            <div className={themeClass(theme, 'myapp-todos-table-container')}>
                <Suspense fallback={<div>Loading...</div>}>
                    <TodosTable />
                </Suspense>
            </div>
        </>
    )
}