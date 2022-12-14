import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setAuthValidation, setUser, setFollowing } from '@@/store';
import { Form } from '@@/components';
import { auth } from '@@/api';
import { useForm, useCookie } from '@@/hooks';
import * as S from './style';

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCookie } = useCookie();
  const {
    formData: { email, password },
    onChange,
    onSubmit,
  } = useForm({
    initialState: {
      email: '',
      password: '',
    },
    authCallback: async ({ formData }) => {
      const response = await auth.signin({ ...formData });

      if (response.status === 200) {
        setCookie({ value: response.token });

        dispatch(setUser(response.user));
        dispatch(setIsLoggedIn(true));
        dispatch(setFollowing(response.user.following));
        navigate('/');
      } else {
        dispatch(setAuthValidation(response.message));
      }

      return response;
    },
  });

  const info = {
    title: '로그인',
    inputs: [
      {
        id: 1,
        type: 'email',
        title: '이메일',
        name: 'email',
        value: email,
        placeholder: '이메일을 입력해주세요',
      },
      {
        id: 2,
        type: 'password',
        title: '비밀번호',
        name: 'password',
        value: password,
        placeholder: '비밀번호를 입력해주세요',
      },
    ],
    isAuth: true,
    link: {
      introText: '아직 회원이 아니신가요?',
      linkText: '가입하기',
      linkPath: '/signup',
    },
  };

  return (
    <S.Container>
      <Form info={info} onChange={onChange} onSubmit={onSubmit} />
    </S.Container>
  );
}
