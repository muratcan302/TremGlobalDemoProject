import DataTable from 'react-data-table-component';
import {useEffect, useState} from "react";
import axios from "axios";

const columns = [
    {
        name: 'Ad Soyad',
        selector: row => row.full_name,
        sortable: true,

    },
    {
        name: 'E-Posta',
        selector: row => row.email,
    },
    {
        name: 'Telefon',
        selector: row => row.phone,
    },
    {
        name: 'Adres',
        selector: row => row.address,
        wrap: true,
    },
    {
        name: 'Eklenme Tarihi',
        selector: row => row.created_at,
        format: row => new Date(row.created_at).toLocaleString(),
        sortable: true,

    }
];

export default function ListUser(){
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:8888/api.php?action=getUsers').then(response => {
            setUsers(response.data.data);
        })
        return response;
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <DataTable
                columns={columns}
                data={users}
            />
        </div>
    )
}