import { supabase } from "../hooks/supabase";
import { useState } from "react";
import FormInput from "../component/FormInput";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!/^[가-힣a-zA-Z0-9]{2,8}$/.test(form.name)) {
      newErrors.name = "2~8자 의 한글, 영어, 숫자만 사용 가능합니다.";
    }
    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(form.password)) {
      newErrors.password = "영문 대/소문자와 숫자 조합 6자 이상";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length === 0) {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { name: form.name },
        },
      });
      if (error) {
        alert(`회원가입 실패: ${error.message}`);
      } else {
        alert("회원가입 완료! 이메일을 확인하세요.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded"
    >
      <h2 className="text-xl font-bold mb-6 text-black">회원가입</h2>
      <FormInput
        label="이름"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="예: 홍길동"
      />
      <FormInput
        label="이메일"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="example@example.com"
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 6~20자)"
      />
      <FormInput
        label="비밀번호 확인"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="비밀번호 재입력"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        회원가입
      </button>
    </form>
  );
}
