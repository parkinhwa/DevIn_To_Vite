import axios from "axios";

const API = import.meta.env.VITE_APP_API_BASEURL;

export const notification = {
  getAllNotifications: async ({ token }) => {
    try {
      const response = await axios.get(`${API}/notifications`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
  setNotificationAsRead: async ({ token }) => {
    try {
      await axios.put(
        `${API}/notifications/seen`,
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  },
  createNotification: async ({ token, data }) => {
    try {
      const response = await axios.post(`${API}/notifications/create`, data, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  },
};

function getCombinations(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((value) => [value]);

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });
  return results;
}

function getCount(array) {
  return array.reduce((pv, cv) => {
    pv[cv] = (pv[cv] || 0) + 1;
    return pv;
  }, {});
}

// fail.sort((a, b) => {
//   if(a[1] === b[1]){ // [1, 0] [2, 0] 두번째 값이 같을때
//       return a[0] - b[0]; // 1, 2 값으로 오름차순
//   } else {
//       return b[1] - a[1]; // 0, 0에 값으로 내림차순
//   }
// });

// for(let x of fail){
//   answer.push(x[0])
// }
// return answer;

// 데브 패스
// 디지털 숫자 판별하기
// pixels이 ["110111", "010101", "010101", "010101", "111111"] 이면
// 1(110, 010, 010, 010, 111)0(111, 101, 101, 101, 111)을 반환

// function solution(pixels) {
//   const pixelNumber = [
//                   ["111", "101", "101", "101", "111"],
//                   ["110", "010", "010", "010", "111"],
//                   ["111", "001", "111", "100", "111"],
//                   ["111", "001", "111", "001", "111"],
//                   ["101", "101", "111", "001", "001"],
//                   ["111", "100", "111", "001", "111"],
//                   ["111", "100", "111", "101", "111"],
//                   ["111", "101", "001", "001", "001"],
//                   ["111", "101", "111", "101", "111"],
//                   ["111", "101", "111", "001", "111"]]
//   let answer = '';
//   for(let i = 0; i < pixels[0].length; i+=3) {
//       const correctNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//       for(let j = 0; j < 5; j++) {
//           const cutPixels = pixels[j].substr(i, 3)
//           for(let k = 0; k < correctNumber.length; k++){
//               if(cutPixels !== pixelNumber[correctNumber[k]][j]) {
//                   correctNumber.splice(correctNumber.indexOf(correctNumber[k]), 1)
//                   k--
//               }
//           }
//       }
//       answer += correctNumber[0]
//   }
//   return answer;
// }
