# Atom 에디터에 ESLint 패키지 설치

개발서버에서 코드 빌드 할때마다 관련 오류나 경고가 터미널에 뜬다.		
`ESLint` 를 설치하면 에디터에서도 관련 오류나 경고를 볼 수 있다.		

> 전에 설치 했던 `jshint` 비활성화 하기
jshint 단점 :  옵션 선택하는 것이 별로 없다.  
스프레이드 문법 같은 경우 아직 호환 해주지 않는다.

# redux react-redux

### `redux`
리덕스만을 위한것

**`combineReducers`**  :  하나의 리듀서로 합쳐 준다  
**`createStore`**  :  데이터 보관 장소

<br/>

### `react-redux`
리액트에서 리덕스를 사용할 수있게 한다.

리액트 리덕스는 뷰 레이어 바인딩 도구이다.  
리액트 컴포넌트에서 리덕스를 사용할 때 복잡한 작업을 얘가 다 해준다.

저번에 카툰안내서에서 뷰 레이어 바인딩은 마치 IT부서와 같다고 했다.

**React-Redux 핵심은 2가지**

#### **`Provider`**  
React App에 Redux를 적용할 때 Provider(공급자)를 사용

첫번째 핵심은 Provider 이다.
* 제공한다는 의미가 있다.
* 컴포넌트에서 리덕스를 사용하도록 서비스를 재공해준다.
* Provider 는 하나의 컴포넌트이다.

```javascript
<Provider store={store}>
  <App />
</Provider>
```

컴포넌트를 ReactDOM으로 페이지에 렌더링하게될 때  
해당 컴포넌트를 Provider  안에 감싸주면 Provider 가 복잡한 작업을 알아서 해준다

<br/>

#### **`connect`**
리듀서와 컴포넌트 연결

두번째 핵심은 connect 이다.

```javascript
connect([...options])
```

**컴포넌트를 Redux에 연결하는 함수를 반환한다.**
이 함수는 옵션을 인수로 받고 그 전달 받은 옵션을 사용해서 컴포넌트를
리덕스에 연결하는 또 다른 함수를 반환한다.

```javascript
connect()(Counter)
```

**store에 연결된 새로운 컴포넌트 클래스가 반환됨**  
**옵션이 없으면 this.props.store 로 접근 가능**  
그 함수에다가 왼쪽처럼 카운터를 인수를 전달해주면  
그 카운터가 리덕스에 연결이 되서  
이 함수의 반환값으로 `새로운 컴포넌트 클래스`가 반환된다.  

새로운 컴포넌트 클래스는 리덕스에 연결이 되어 있다.  
그렇다고해서 카운터 컴포넌트가 변경되는 것은 아니다.  
새로운 컴포넌트가 반환되는 것이다.  

만약에 화면에 보는 것처럼  
connect 에 옵션을 전달하지 않았다면  
컴포넌트 내부에서 this.porps.store 로 접근이 가능하다  
그러면 렌더링할때 그 스토어를 getStore() 를 특정 값을 가져오면 된다.  
아니면 변환을 일으킬 때 디스패치하면 된다.  

그런데 만약에 옵션을 넣으면 깔끔해지고 편해진다.  
**그 옵션은 4가지가 있다.**  
첫번째 3개는 함수 형태의 파라미터이다.  

```javascript
connect(
  [mpaStateToProps],
  [mapDispatchToProps],
  [mergeProps],
  [options]
)
```

**`mpaStateToProps`**    
`State` 를 파라미터로 가지는 함수이다.  
State 를 해당 컴포넌트의 props 로 연결해주는 것이다.  

**`mapDispatchToProps`**  
`디스패치`를 파라미터로 가지는 함수이다.  
디스패치하는 함수를 props로 연결해 준다.  

**`mergeProps`**  
state 와 디스패치를 파라미터로 가지고 있어서  
만약에 컴포넌트에 연결해야할 props가 State랑  
동시에 사용해야 한다면 여기서 쓰면 되는 것이다  .
**보통 mergeProps 은 잘 사용 되지 않는다.**  

**`options`**  
객체형태인데 pure 와 withRef가 있다  
pure 는 기본적으로 true로 설정되어 있다.  
ture로 설정되어 있으면 불필요한 업데이  트를 하지 않는다.  
withRef는 기본적으로 false 이다
만약에 ture로 설정되어 있으면  
리덕스에 연결된 컴포넌트를 withRef에 담아서  
getWrappedlnstance() 로 통하여 접근하게 해준다.  
**보통 사용될 일이 없다.**

## Installation

```sh
# npm
npm install --save redux react-redux

# yarn
yarn add redux react-redux
```

# action 함수 생성

ACTION = **작업에 대한 정보**를 지니고 있는 **객체**

**프로젝트에 필요한 액션**

1. 값 증가
2. 값 감소
3. 새로운 색상 설정

## **actions/ActionTypes.js**

```javascript
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET_COLOR = "SET_COLOR";
```

`대문자`와 `_` 으로 이름 만들기  
이 파일에 **우리 액션의 이름을 상수 형태** 로 만들고  
다른 파일에서 불러와서 사용 할 수 있도록 내보낸다.  

## **actions/index.js**

```javascript
import * as types from './ActionTypes';

export function increment(){
  return {
      type : types.INCREMENT
  };
}

export function decrement(){
  return {
      type : types.DECREMENT
  };
}

export function setColor(color){
  return {
      type : types.SET_COLOR,
      color
  };
}
```

액션을 그때 그때 객체로 만들기 귀찮다.
그럴 때 있는것이 **액션 생성자**이다.

**`actions/index.js`** 만들고
이름이 index 인 이유는
액션 디렉토리만 불러왔을 때
자동으로 이 파일이 로드 되게 하기 위해서이다.

기존의 컴포넌트를 보면

export default 를 써서 내보내고
import 를 통해 받아왔었다.
**action 에는 default 가 없다.**

<br />

```javascript
import {INCREMENT, DECREMENT, SET_COLOR} from './ActionTypes';
```

default 가 없고 export 만 있을 경우 위처럼 적어주면 된다.

더 쉬운 방법이 있다.
아래처럼 작성해주면 된다.

```javascript
import * as types from './ActionTypes';
```

위처럼 입력하면 각 상수에 접근 할때 아래처럼 하면 된다.

```javascript
export function increment(){
  return {
      type : types.INCREMENT
  };
}

export function decrement(){
  return {
      type : types.DECREMENT
  };
}
```

* 액션 생성자를 다른 곳에서 불러올 수 있도록 export 해준다.
* 액션 생성자는 함수이다.  (카멜표기법으로하기)
* 리턴 하는 것은 객체 이다.
* INCREMENT, DECREMENT 액션은 따로 불러올 타입은 type 밖에 없다.

```javascript
export function setColor(color){
  return {
      type : types.SET_COLOR,
      color
  };
}
```

* SET_COLOR 는 조금 다르다. 왜냐하면 **파라미터** 가 있다. 크게 다른 것은 없다.
* return의 color 는 color : color 와 같은 것이다.

<br/>

**액션은 아래처럼 객체 형태**

```javascript
{type : "INCREMENT"}
{type : "DECREMENT"}
{
  type : "SET_COLOR",
  color : [200,200,200]
}
```

* **액션 객체가 필수** 로 가지고 있어햐 하는 것은 **type** 이다.
* SET_COLOR는 어떤 값인지 알려줘야 한다.
* color 배열 값은 RGB 이다.

<br/>

# reducers 생성

* 변화를 일으키는 함수
* 순수해야 함

+ 비동기작업 X
  + 비동기작업 : http 같은 작업을 말한다.
+ 인수 변경 X
+ 동일한 인수 = 동일한 결과

* 이전 상태와 액션을 받아서 다음상태를 반환
  * **이전 상태를 변경하는게 아님**
  * **새로운 상태로 반환하는 것!**

<br/>

## **reducers/counter.js**

**`ES6 문법으로 바꾸기 전`**
```javascript
import * as types from '../actions/ActionTypes';

// 설명[1]
const initialState = {
  number : 0
};

// 설명[2]
export default function counter(state, action){
  if(typeof state === `undefined`){
    return initialState;
  }
  /* ... */
  return state;
}
```

**설명[1]**

initialState = 리듀서 초기 상태를 정하는 것  
리듀서의 함수 파라미터로 이전 상태 값과 액션을 전달 받을건데  
`가장 처음 이전 상태가 정의되어 있지 않기 때문에 초기 상태를 작성해준다.`  

**설명[2]**

상수 형태의 객체로 작성한다.

내보내기  
이전 상 태 값인 state, action 을 파라미터로 받아온다.  

이 함수가 처음 실행 될때는 state 가 undefined 이다.  
우리가 지정해준 initialState 을 지정해준다.  

만약에 state 가 undefined 일때에는  
initialState 를 리턴한다.

**`위 코드를 ES6 문법으로 고쳐보기`**

```javascript
import * as types from '../actions/ActionTypes';

const initialState = {
  number : 0
};

// 설명[1]
export default function counter(state = initialState, action){
  switch (acton.type) {
    case type.INCREMENT:
      return { number : state.number + 1 }
  }

  return state;
}
```

**설명[1]**
es6문법 - default Argument 문법
즉, 기본 인수 문법

state가 undefined 일 때
initialState 를 가져다가 쓴다.

**`state 값이 여려개 일 경우 위처럼 하면 다른 state는 사라진다.`**  
**`방법) 아래처럼 작성해주면 된다.`**

```javascript
import * as types from '../actions/ActionTypes';

const initialState = {
	number : 0,
	dummy : 'dumb',
	dumbObject : {
		d : 0,
		u : 1,  // 설명[2]
		m : 2,
		b : 3,
	}
};

export default function counter(state = initialState, action){
	switch(action.type){
		case types.INCREMENT :
			return {
				...state, // 설명[1]
				number : state.number + 1,  // 설명[1]
				dumbObject : { ...state.dumbObject, u :0 } // 설명[2]
			};

		case types.DECREMENT :
			return {
				...state,
				number : state.number -1
			};

		default :
			return state;
	}
}
```

**설명[1]**  
...state 는 state값을 다 복 사 한 후, 변경된 number 값을 덮어 씌우는 것이다.


**설명[2]**  
state 값에 객체 한 부분을 수정하고 싶을 때  
dumbObject 안에 u 값을 1  ->  0으로 변경 할  때

## **reducers/ui.js**
카운터의 배경화면 색상을 담당

```javascript
import * as types from '../actions/ActionTypes';

const initialState = {
	color : [255, 255, 255]
};

export default function ui(state = initialState, action){
	if(action.type === types.SET_COLOR){
		return { color : action.color };
	}else {
		return state;
	}
}
```

## **reducers/index.js**
리듀서가 2개 이상일 때는 리듀서를 합쳐야 한다.

```javascript
import { combineReducers } from 'redux';
import counter from './counter';
import ui from './ui';

const reducers = combineReducers({
	counter, ui
});

export default reducers;
```

`combineReducers`를 사용하여 하나의 리듀서로 합쳐줄 수 있다.

<br/>

# Redux Store 생성
STORE = 어플리케이션의 현재 상태를 지니고 있다.

**리덕스** 를 사용하는 어플리케이션은 **단 하나의 스토어** 가 있어야 한다.  
스토어를 만들려면 리덕스에서 `createStore` 를 불러온 다음에  
리듀서를 인수로 전달하여 해당 함수를 실행하면 된다.

## **store가 하는 일**

### **`dispatch(action)`**

액션을 리듀서로 보낸다 는 뜻이다.  
디스패치가 실행되면 **스토어는 리듀서 함수에  
현재 자신 상태와 지금 전달 받은 액션을 전달** 해 준다.  
리듀서가 어떤 변화가 필요하는지 알아 낸 후  
변화를 주고 **새 상태를 주면 현 상태에 갈아 끼우는 것** 이다.  

### **`getState()`**

State 는 **현재 상태** 를 반환하는 함수이다.

### **`subscribe(listener)`**
 
상태가 바뀔 때마다 실행할 함수를 등록하는 것이다.  
여기서 listener 가 **상태가 바뀔 때마다 실행될 콜백함수** 이다.

### **`replaceReducer(nextReducer)`**
핫리로딩과 코드 분할을 구현할 때 사용 되는 것인데
**보통 사용 될 일이 없다.**


**`아래는 store 하는 일을 보기 위한 예시`**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from './actions';                   // 설명[1]
import App from './components/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
const store = createStore(reducers);

console.log(store.getState());                          // 설명[2]
store.subscribe(() => console.log(store.getState()));   // 설명[3]
store.dispatch(actions.increment());                    // 설명[4-1]
store.dispatch(actions.increment());                    // 설명[4-2]
store.dispatch(actions.decrement());                    // 설명[4-3]

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	document.getElementById('root')
);
```

**설명[1]**  
액션 함수 추가 - index 를 불러 오는 것이기 때문에 뒤에 index 작성하지 않아도 된다.

**설명[2]**  
store.getState()  
현재 state 상태를 console 로 보내준다.

**설명[3]**  
subscribe() 는 상태가 바뀔 때 마다 읽어준다.  
number 값 : 0

**설명[4-1]**    
number 값 : 1

**설명[4-2]**  
number 값 : 2

**설명[4-3]**  
number 값 : 1

**`아래는 store 하는 일을 보기 위한 예시`**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from './actions';                  
import App from './components/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
const store = createStore(reducers);

// 설명[1]
console.log(store.getState());                         
const unsubscribe = store.subscribe(() => console.log(store.getState()));   
store.dispatch(actions.increment());                    
store.dispatch(actions.increment());                    
store.dispatch(actions.decrement());                    
store.dispatch(actions.setColor([200,200,200]));        

// 설명[2]
unsubscribe();  
store.dispatch(actions.setColor([210,210,210]));                    

ReactDOM.render(
	<Provider store={store}>
			<App />
	</Provider>,

	document.getElementById('root')
);
```

**설명[1]**  
더 이상 알림을 받고싶지 않을경우  
subscribe 함수가 반환하는 내용을  
unsubscribe 에 넣으면 된다.  

**설명[2]**

```javascript
store.dispatch(action.setColor([200,200,200]));
```
unsubscribe();  위까지 출력되고,

```javascript
store.dispatch(action.setColor([210,210,210]));
```
그 아래는 출력되지 않는다.

## src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

/* Redux 연결 */
// createStore(데이터 보관 장소)를 리덕스에서 가져오기
import { createStore } from 'redux';

// 리액트 앱에 리덕스를 적용 할 때에는, react-redux 에 들어있는 Provider(공급자) 를 사용
import { Provider } from 'react-redux';

// 리덕스파일을 스토어에 보관 한 것을 상수 store에 넣기.
import reducers from './reducers';  // 설명[1]
const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root')
);
```

**설명[1]**
index 를 불러 오는 것이기 때문에 뒤에 index 작성하지 않아도 된다.

<br/>

# connect를 통하여 reducers에 연결

Counter 컴포넌트를 connect  를 통하여 리듀서에 연결해 보기  
리덕스 관련 작업을 할 것이다.  
Value, Control 멍청한 컴포넌트는 리덕스를 연결해서 받은 값을 전달만 해줄 것이다. 

<br/> 

## **component/Counter.js**

```javascript
import React, { Component } from 'react';

import Value from './Value';
import Control from './Control';
import { connect } from 'react-redux';
//import { connect, bindActionCreators } from 'react-redux';

import * as actions from '../actions';

class Counter extends Component {
  render() {
  	const { number, handleIncrement, handleDecrement } = this.props;

    return(
		<div>
			<Value number={number} />

			<Control
				onPlus={handleIncrement}
				onSubstract={handleDecrement}
			/>
		</div>
    );
  }
}

// 설명[1]
const mapStateToProps = (state) => {
  return {
    number : state.counter.number,
    color : state.ui.color
  };
}

// 설명[2]
const mapDispatchToProps = (dispatch) => {
  //	return bindActionCreators(actions, dispatch); // 설명[3]
	return {
		handleIncrement : () => { dispatch(actions.increment()) },
		handleDecrement : () => { dispatch(actions.decrement()) },
		handleSetColor : (color) => { dispatch(actions.setColor(color)) },
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);
```

**설명[1] : mapStateToProps**  
export default Counter 하기전  
리듀서 State 안에 있는 것을 이 컴포넌트의 props 로 맵핑해주는 것이다.  
여기의 State 는 컴포넌트의 State 와는 다른 것이다.  
그냥 파라미터 이름이 State 인 것이다.  
  
그리고 이 State 는 리덕스 State 를 칭하는 것이다.  
객체를 리턴하고  
어떠한 props 가 State 의 어떠한 값으로 연결될 지  
여기서 정하는 것이다.  

number 라는 props를 여기다 연결할 것  
이렇게 리턴하면 state 안에 있던 값이  
이 컴포넌트의 number props와 color props 와 연결이 되는 것이다.

**설명[2] : mapDispatchToProps**  
액션을 디스패치하는 함수를 props 로 연결해주는 것이다.

**설명[3] : bindActionCreators**  
mapDispatchToProps 를 더 쉽게하는 방법 : bindActionCreators 를 사용하는 것

```javascript
import { connect, bindActionCreators } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions, dispatch);
}
```

처리를 자동으로 해준다.  
파라미터도 자동으로 설정해준다.  

단점 : 이름을 임의(handleIncrement)로 해줬지만  
액션이름 그대로 사용 된다는 점.

**[참고]**  
mapStateToProps 와 mapDispatchToProps 를 작성하지 않으면 아래처럼 작성 해야 한다.

```javascript
<Value number={this.props.store.getState().counter.number)} />
```

<br/>

# 랜덤 컬러

## **component/Counter.js**

```javascript
import React, { Component } from 'react';

import Value from './Value';
import Control from './Control';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Counter extends Component {
  constructor(props) {
      super(props);
	    this.setRandomColor = this.setRandomColor.bind(this);
  }

	setRandomColor(){
		const color = [
			Math.floor((Math.random()*55) + 200),
			Math.floor((Math.random()*55) + 200),
			Math.floor((Math.random()*55) + 200),
		];
		this.props.handleSetColor(color);
	}

  render() {
  	const { number, handleIncrement, handleDecrement } = this.props;
  	const color = this.props.color;

    // [설명1]
  	const style = {
  		background : `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  	};

    return(
      <div style={style}>
  			<Value number={number} />

  			<Control
  				onPlus={handleIncrement}
  				onSubstract={handleDecrement}
  				onRandomizeColor ={this.setRandomColor}
  			/>
  		</div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    number : state.counter.number,
    color : state.ui.color
  };
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleIncrement : () => { dispatch(actions.increment()) },
		handleDecrement : () => { dispatch(actions.decrement()) },
		handleSetColor : (color) => { dispatch(actions.setColor(color)) },
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);
```


**설명[1]**
[Template literals 참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
)

```javascript
const style = {
  background : `rgb(${color[0]}, ${color[1]}, ${color[2]})`
};
```
