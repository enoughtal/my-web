import './index.sass'

export default function TodosForm() {
    return (
        <div className='myapp-comp-todosform'>
            <div className='myapp-comp-todosform-title'>
                <span className='myapp-comp-todosform-title-element'>
                    👽
                </span>
                <span className='myapp-comp-todosform-title-text'>
                    To D<span>🔮</span>
                </span>
            </div>

            <div className='myapp-comp-todosform-input'>
                <label className='myapp-comp-todosform-input-content'>
                    要做的事
                    <input type='text'

                    />
                </label>
                <label className='myapp-comp-todosform-input-rank'>
                    优先级
                    <input type='text'

                    />
                </label>
                <button type='button'
                    className='myapp-comp-todosform-input-button'
                >
                    新建
                </button>
            </div>
        </div>
    )
}