import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons/lib/icons";

import s from "./index.modules.css";
import { Modal } from './../Modal/Modal';
import { RegistrationForm } from './../RegistrationForm/RegistrationForm';
import { AuthForm } from './../AuthForm/AuthForm';
import { ResetPasswordForm } from '../ResetPasswordForm/ResetPasswordForm';

function FormModal({onSubmit}) {
	const location = useLocation();
	const state = location.state;
	const navigate = useNavigate();

	return (
		<>
			 {state?.backgroundLocation && (
				<Routes>
					<Route
						path="/login"
						element={
						<Modal
							active={true}
							setActive={() => {
							navigate(-1);
							}}
						>
							<>
							<AuthForm onSubmit={onSubmit}>
								<Link
									to="/reset_password"
									replace={true}
									state={{ ...state, backgroundLocation: location }}
									style={{ textDecoration: "none", textAlign: "right", color: "#7B8E98", fontSize: "14px" }}
								>
									<p>Востановить пароль</p>
								</Link>
							</AuthForm>
							<Link
								to="/register"
								className="btn btn_type_border"
								replace={true}
								state={{ ...state, backgroundLocation: location }}
							> 
								Регистрация
							</Link>
							</>
						</Modal>
						}
					/>
					<Route
						path="/register"
						element={
						<Modal
							active={true}
							setActive={() => {
							navigate(-1);
							}}
						>
							<>
							<RegistrationForm  onSubmit={onSubmit}/>
							<Link
								to="/login"
								className="btn btn_type_border"
								replace={true}
								state={{ ...state, backgroundLocation: location }}
							> 
								Войти
							</Link>
							</>
						</Modal>
						}
					/>
					<Route
						path="/reset_password"
						element={
						<Modal
							active={true}
							setActive={() => {
							navigate(-1);
							}}
						>
							<ResetPasswordForm  onSubmit={onSubmit}/>
							<Link
								to="/register"
								className="btn btn_type_border"
								replace={true}
								state={{ ...state, backgroundLocation: location }}
							> 
								Войти
							</Link>
						</Modal>
						}
					/>
				</Routes>
          		)}
			</>
	);
}

export default FormModal;
