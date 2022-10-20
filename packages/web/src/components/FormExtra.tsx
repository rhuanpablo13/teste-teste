import { useEffect, useState } from 'react';

export default function FormExtra({ onChange }: any) {
  const [checkState, setCheck] = useState<boolean>(false);

  const handleCheck = async (e: any) => {
    e.preventDefault();
    setCheck(e.target.checked);
    localStorage.setItem('rememberCheck', e.target.checked);

    onChange(e.target.checked);
  };

  useEffect(() => {
    const check = localStorage.getItem('rememberCheck') || false;
    const isChecked: boolean = check && JSON.parse(check);
    setCheck(isChecked);
  }, []);

  return (
    <div className="flex items-center justify-between cursor-pointer">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-violet-900 focus:ring-violet-500 border-gray-300 rounded cursor-pointer"
          onChange={handleCheck}
          checked={checkState}
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-900 "
        >
          Lembrar login
        </label>
      </div>
    </div>
  );
}
