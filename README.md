# DevIn_To_Vite
빌드 속도, 서버 시작 속도 향상을 위해 DevIn 프로젝트를 Vite로 마이그레이션 해봤다.

기존 DevIn 프로젝트 :point_right: https://github.com/parkinhwa/FEDC2_DevIn_Channi

## 방법

### 1. vite 프로젝트 생성
```
yarn create vite
```

### 2. 패키지 설치

    기존 프로젝트에서 사용했던 패키지를 설치해주었다.
    
```json   
    // package.json
    "dependencies": {
      "@reduxjs/toolkit": "^1.8.2",
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "devDependencies": {
      "@types/react": "^18.0.24",
      "@types/react-dom": "^18.0.8",
      "@vitejs/plugin-react": "^2.2.0",
      "vite": "^3.2.3",
      "axios": "^0.27.2",
      "buffer": "^6.0.3",
      "dotenv": "^16.0.1",
      "loadsh": "^0.0.4",
      "lodash": "^4.17.21",
      "nanoid": "^4.0.0",
      "prop-types": "^15.8.1",
      "react-cookie": "^4.1.1",
      "react-error-boundary": "^3.1.4",
      "react-helmet-async": "^1.3.0",
      "react-modal": "^3.15.1",
      "react-redux": "^8.0.2",
      "react-router-dom": "^6.3.0",
      "react-scripts": "5.0.1",
      "styled-components": "^5.3.5",
      "styled-reset": "^4.4.1",
      "web-vitals": "^2.1.4"
    }
```

### 3. 절대경로 설정
    절대경로를 src로 하도록 설정해주었다.
    
```js
     // vite.config.js
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    import * as path from 'path'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          "@@": path.resolve(__dirname, "./src/"),
        },
      },
    });
```
     
```js
    // jsconfig.js
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "@@/*": ["/src/*"]
        }
      }
    }
```
    
다음과 같이 설정하면 `import { component } from “@@/components”` ⇒ `import { component } from “/src/components”` 와 같다.

src앞에 /를 안붙이면 **[Vite "rollup failed to resolve" build error](https://stackoverflow.com/questions/67696920/vite-rollup-failed-to-resolve-build-error)** 에러가 난다…
(build.rollupOptions.external가 외부파일을 먼저 찾기때문이라고 한다)
     
    
### 4. process.env ⇒ import.meta.env로 바꾸고 .env 파일에 있는 변수들 VITE_로 시작되게 바꿈
        
```jsx
      const API = process.env.REACT_APP_API_BASEURL;
```

```jsx
      const API = process.env.VITE_APP_API_BASEURL;
```
      
.env

```jsx
      REACT_APP_API_BASEURL
      REACT_APP_API_CHANNEL_ID
      REACT_APP_OG_API_BASEURL
```

```jsx
      VITE_APP_API_BASEURL
      VITE_APP_API_CHANNEL_ID
      VITE_APP_OG_API_BASEURL
```
 
 ### 5. 결과
 
 ![image](https://user-images.githubusercontent.com/65644486/202185848-2347e950-d15b-4629-8e4d-56d0c23406fe.png)
 
 다음과 같이 빌드 속도가 훨씬 빨라진 것을 확인할 수 있었고 서버 시작 속도도 훨씬 빨라졌다!
 
 성능 측정 웹 페이지에서 성능 측정하기 ([https://tools.pingdom.com/](https://tools.pingdom.com/))

 점수가 드라마틱하게 오르진 않았지만 페이지 사이즈, 로드 시간, 요청 수 모두 눈에 띄게 감소한 것을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/65644486/202185994-3a27b281-dc18-4292-9d0e-7d55b4c1d6d6.png)

 
      
