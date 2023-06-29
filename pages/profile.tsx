import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"
import Cookies from 'js-cookie';
import prisma from '../lib/prisma'
import { loginDetailsProp } from "../components/Header";


const ProfilePage: React.FC = (props) => {

    const [editName, setEditName] = useState(false)
    const [formData, setFormData] = useState<FormData | null>(null);

    const [name, setName] = useState('');
    const [loginDetails, setLoginDetails] = useState<loginDetailsProp | null>(null);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(name==''){
            return;
        }
        if (!loginDetails){
           
            return;
        }
    }
    
    useEffect(() => {
        if (!loginDetails) {
            const user = Cookies.get("LogInToken");
            console.log(user);
            if(user){
             let parsedUser =  JSON.parse(user);
            const userLogedIn: loginDetailsProp = {};
             userLogedIn.email = parsedUser.user.email;
             userLogedIn.username = parsedUser.user.username;
             userLogedIn.name = parsedUser.user.name;
             userLogedIn.id = parsedUser.user.id;
            setLoginDetails(userLogedIn);
            console.log("create user update")
            console.log(user);
             }
        }
    },[]); 

    if(!loginDetails){
        return <div></div>;
    }
    return(
        <Layout>
            <div>
                <h1> Profile </h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', marginBottom: '1rem' }}>
                        <label htmlFor="username" style={{ marginRight: '0.5rem', width: '80px' }}>Username:</label>
                        <input
                        type="text"
                        id="username"
                        value={loginDetails?.username}
                        style={{ flex: 1, maxWidth: '200px' }}
                        readOnly
                        />
                    </div>
                    <div style={{ display: 'flex', marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ marginRight: '0.5rem', width: '80px' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={loginDetails?.email}
                        style={{ flex: 1, maxWidth: '200px' }}
                        readOnly
                    />
                    </div>
                    <div style={{ display: 'flex', marginBottom: '1rem' }}>
                    <label htmlFor="name" style={{ marginRight: '0.5rem', width: '80px' }}>name:</label>
                    <input
                        type="name"
                        id="name"
                        value={loginDetails?.name}
                        style={{ flex: 1, maxWidth: '200px' }}
                        readOnly
                    />
                
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default ProfilePage;