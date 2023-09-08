import { Table } from 'antd';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { GUEST_ID, LOGIN_PATH } from '../../../../global.cjs';
import todosSlice, {
  loadTodos,
  saveTodos,
  selectDirtyTodos,
  selectShowedTodos,
} from '../../../store/todos';
import { savePreference } from '../../../store/user';
import { themeClass, themeId } from '../../../tools/helper';
import { useBlocker, useLock } from '../../../tools/hooks';
import './index.sass';

const locale = {
  filterReset: '重置',
  filterConfirm: '确定',
  triggerAsc: '点击升序',
  triggerDesc: '点击降序',
  cancelSort: '取消排序',
  emptyText: (
    <span className="myapp-todos-table-placeholder-text">
      做完了所有要做的事，或者问问水晶球
    </span>
  ),
};

export default function TodosTable() {
  const userId = useSelector((state) => state.user.userId);
  const theme = useSelector((state) => state.user.preference.theme);
  const el = useSelector((state) => state.user.preference.element);
  const dirtyTodos = useSelector(selectDirtyTodos);
  const showedTodos = useSelector(selectShowedTodos);

  const tableRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [locked, lock] = useLock();

  const noneTodo = showedTodos.length === 0;
  const isAuth = userId !== GUEST_ID;
  const whenPrompt = dirtyTodos && !isAuth;
  const whenSave = dirtyTodos && isAuth;
  const rankFire = (rank) => el.repeat(4 - rank);

  /* 给.ant-table-placeholder的元素设置一个id属性
        id的优先级高于className，覆盖antd的默认css规则
    */
  useEffect(() => {
    if (noneTodo) {
      tableRef.current
        .getElementsByClassName('ant-table-placeholder')[0] //只有一个元素
        .setAttribute('id', themeId(theme, 'myapp-todos-table-placeholder'));
    }
  }, [noneTodo, theme]);

  /* 获取todos */
  useEffect(() => {
    if (isAuth) {
      dispatch(loadTodos({ userId }));
    }
  }, [dispatch, isAuth, userId]);

  /* 保存todos */
  const save = (tx) => {
    //tx由useBlocker传参，手动保存时没有
    if (dirtyTodos) {
      dispatch(saveTodos(dirtyTodos));
    }
    if (tx) {
      tx.retry();
    }
  };

  /* 弹出提示，提醒保存 */
  const prompt = (tx) => {
    const message =
      '数据已修改，是否保存？\r\n点击“确定”进入登录页面，点击“取消”不保存';

    if (tx && tx.location.pathname === LOGIN_PATH) {
      //如果直接点击登录就不提示
      tx.redirect(LOGIN_PATH, { state: { from: location } });
    } else {
      if (window.confirm(message)) {
        //确定
        if (tx) {
          tx.redirect(LOGIN_PATH, { state: { from: tx.location } });
        } else {
          navigate(LOGIN_PATH, { state: { from: location } });
        }
      } else {
        //取消
        dispatch(todosSlice.actions.clean());
        if (tx) {
          tx.retry();
        }
      }
    }
  };

  /* 类似于vue里的导航守卫beforeRouteLeave */
  useBlocker(prompt, whenPrompt);
  useBlocker(save, whenSave);

  /* 手动点保存 */
  const manualSave = () => {
    if (!locked) {
      lock();
      if (!isAuth) {
        //手动保存不判断isDirty
        prompt();
      } else {
        save();

        const data = {
          //额外保存element
          element: el,
          userId,
        };
        dispatch(savePreference(data));
      }
    }
  };

  const saveButton = (
    <div
      className="myapp-todos-table-header-save none-user-select"
      onClick={manualSave}
    >
      💾
    </div>
  );

  const columns = [
    {
      title: '🎯要做的事',
      dataIndex: 'content',
      width: '45%',
    },
    {
      title: `${el}优先级`,
      dataIndex: 'rank',
      width: '20%',
      render: (rank) => rankFire(rank),
      filters: [3, 2, 1].map((rank) => ({
        text: rankFire(rank),
        value: rank,
      })),
      onFilter(value, record) {
        return value === record.rank;
      },
      sorter(a, b) {
        return b.rank - a.rank;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: '20%',
    },
    {
      title: saveButton,
      render: (text, record) => {
        const changeRank = () => {
          dispatch(todosSlice.actions.changeRank(record.id));
        };
        const complete = () => {
          dispatch(todosSlice.actions.complete(record.id));
        };
        return (
          <div className="myapp-todos-table-header-operate">
            <span onClick={changeRank} className="none-user-select">
              {el}
            </span>
            <span onClick={complete} className="none-user-select">
              ⭕
            </span>
          </div>
        );
      },
    },
  ];

  const components = {
    header: {
      cell: (props) => (
        //using id to override antd's default css
        <th id={themeId(theme, 'myapp-todos-table-header-cell')} {...props} />
      ),
    },
    body: {
      cell: (props) => <td id="myapp-todos-table-body-cell" {...props} />,
    },
  };

  return (
    <div className="myapp-todos-table">
      <Table
        dataSource={showedTodos}
        columns={columns}
        rowKey="id"
        components={components}
        locale={locale}
        pagination={false}
        sticky={{ offsetHeader: 'calc(34px + 96px + 1rem)' }}
        rowClassName={themeClass(theme, 'myapp-todos-table-row')}
        ref={tableRef}
      />
    </div>
  );
}
