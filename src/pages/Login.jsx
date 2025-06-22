import { useState } from "react";
import FormInput from "../component/FormInput";
import { supabase } from "../hooks/supabase";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (form.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상 입력하세요.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length === 0) {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) {
        alert(`로그인 실패: ${error.message}`);
      } else {
        alert("로그인 완료!");
        navigate("/");
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
      className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded text-black"
    >
      <h2 className="text-xl font-bold mb-6">로그인</h2>
      <FormInput
        label="이메일"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormInput
        label="비밀번호"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        로그인
      </button>
    </form>
  );
}
