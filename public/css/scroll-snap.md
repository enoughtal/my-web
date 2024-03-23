# scroll-snap

在scroll的时候怎么做到一条列表一条列表的滚动？

.scroller {
height: 300px;
overflow-y: scroll;
scroll-snap-type: y mandatory;
}

.scroller section {
scroll-snap-align: start;
}

`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts`
