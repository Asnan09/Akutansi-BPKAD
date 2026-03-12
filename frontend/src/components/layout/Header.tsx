import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import bpkadLogo from "../../assets/images/logo-bpkad.png";
import bpkadBuilding from "../../assets/images/bpkad-building.png";

interface HeaderProps {
  title?: string;
}

interface DecodedToken {
  username: string;
  role: string;
}

interface UserInfo {
  username: string;
  role: string;
}

function getUserInfoFromToken(): UserInfo {
  const token =
    sessionStorage.getItem("authToken") ?? localStorage.getItem("authToken");

  if (!token) {
    return { username: "", role: "" };
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    return {
      username: decodedToken.username ?? "",
      role: decodedToken.role ?? "",
    };
  } catch {
    return { username: "", role: "" };
  }
}

export default function Header({ title }: HeaderProps) {
  const [{ username, role }] = useState<UserInfo>(() => getUserInfoFromToken());

  return (
    <header className="h-16 lg:h-20 bg-white flex items-center justify-between px-4 lg:px-8 shadow-sm border-b border-orange-100/50">
      <div className="text-lg lg:text-2xl font-bold text-gray-800">
        {title}
      </div>

      <img
        src={bpkadBuilding}
        className="h-10 lg:h-12 object-contain"
        alt="BPKAD Building"
      />
    </header>
  );
}
