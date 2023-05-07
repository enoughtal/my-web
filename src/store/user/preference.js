/*
    this module includes preference and tictactoe
*/
import { createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { ELEMENT, powerValues, prizeEmojiArr, prizeTextArr, scoreValues } from '../../../global.cjs'
import fetch from './fetch'

//tic游戏加分
const gain = (result) => {
    const gained = { count: 1 }
    switch (result) {
        case 'draw-easy': return { ...gained, score: scoreValues[0] }
        case 'draw-hard': return { ...gained, score: scoreValues[1] }
        case 'win-easy': return { ...gained, score: scoreValues[2] }
        case 'win-hard': return { ...gained, score: scoreValues[3] }
        default: return { ...gained, lose: 1 }
    }
}

/* 保存主题 */
const savePreference = createAsyncThunk(
    'user/server/savePreference',
    async (data) => {
        await fetch.savePreference(data)
    }
)

/* 保存游戏得分 */
const saveTic = createAsyncThunk(
    'user/server/saveTic',
    async (data) => {
        await fetch.saveTic(data)
    }
)

/* selector，计算战力 */
const selectPower = createSelector(
    (state) => state.user.tic,
    ({totalScore, lose, count}) => count ? Math.floor(totalScore * (1 - lose / count)) : 0
)

/* selector，计算头衔 */
const selectTitle = createSelector(
    selectPower,
    (power) => {
        for (let i = powerValues.length - 1; i >= 0; i --) {
            if (power >= powerValues[i]) {
                return [prizeEmojiArr[i], prizeTextArr[i]]
            }
        }
    }
)

/* selector，计算不败率 */
const selectNotLoseRate = createSelector(
    (state) => state.user.tic,
    ({lose, count}) => count ? ((1 - lose / count) * 100).toFixed(1) + '%' : '-'
)

/* reducers */
const preferenceReducers = {
    changeElement: (state) => {
        state.preference.element = ELEMENT[(ELEMENT.indexOf(state.preference.element) + 1) % ELEMENT.length]
    },
    toggleTheme: (state) => {
        if (state.preference.theme === 'light') {
            state.preference.theme = 'dark'
        }
        else {
            state.preference.theme = 'light'
        }
    },
    refleshTic: (state, action) => {
        const gained = gain(action.payload)
        state.tic.count += gained.count
        if (gained.lose) {
            state.tic.lose += gained.lose
        }
        else {
            state.tic.totalScore += gained.score
        }
    }
}
export default preferenceReducers
export { savePreference, saveTic, selectPower, selectNotLoseRate, selectTitle }
