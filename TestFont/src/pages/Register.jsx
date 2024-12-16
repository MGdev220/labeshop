import { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // if (formData.password !== formData.confirmPassword) {
    //   setError("Les mots de passe ne correspondent pas.");
    //   return;
    // }

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };

  return (


    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">créer un compte sur LabeShop</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">{"S'inscrire"}</button>
        </form>
        <p className="login-footer">
          Déja inscrit ? <a href="/login">{"Se connecter"}</a>
        </p>
      </div>
    </div>





  );
};

export default Register;


// <div className="register-container">
//   <h2>Créer un compte</h2>
//   {error && <p style={{ color: "red" }}>{error}</p>}
//   <form onSubmit={handleSubmit}>
//     <input
//       type="text"
//       name="name"
//       placeholder="Nom"
//       value={formData.name}
//       onChange={handleChange}
//       required
//     />
//     <input
//       type="email"
//       name="email"
//       placeholder="Email"
//       value={formData.email}
//       onChange={handleChange}
//       required
//     />
//     <input
//       type="password"
//       name="password"
//       placeholder="Mot de passe"
//       value={formData.password}
//       onChange={handleChange}
//       required
//     />
//     <input
//       type="password"
//       name="confirmPassword"
//       placeholder="Confirmer le mot de passe"
//       value={formData.confirmPassword}
//       onChange={handleChange}
//       required
//     />
//     <button type="submit">{"S'inscrire"}</button>
//   </form>
// </div>