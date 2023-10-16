import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateEmployee from './CreateEmployee';
import EditEmployee from './EditEmployee';

const ManageEmployee = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
    /* Defining a role-to-color object */
    const roleColors: Record<string, string> = {
        admin: 'bg-red-500',
        manager: 'bg-orange-500',
        employee: 'bg-green-500',
    };

    const addEmployee = (newEmployee: CreateEmployee) => {
        axios.post('http://localhost:3000/users', newEmployee)
            .then((response) => {
                setEmployees((prevEmployees) => [...prevEmployees, response.data]);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const editEmployeeHandler = (employee: Employee) => {
        setEditEmployee(employee);
    };

    /* To Clear the editEmployee state to exit the editing mode */
    const cancelEdit = () => {
        setEditEmployee(null);
    };

    const deleteUser = (userId: number) => {
        axios.delete(`http://localhost:3000/users/${userId}`).then(() =>
            setEmployees((prevEmployees) => prevEmployees.filter((user) => user.id !== userId)),
        ).catch((err) => {
            console.error(err);
        });
    };

    const updateEmployee = (updatedEmployee: Employee) => {
        axios.put(`http://localhost:3000/users/${updatedEmployee.id}`, updatedEmployee)
            .then((response) => {
                setEmployees((prevEmployees) =>
                    prevEmployees.map((employee) =>
                        employee.id === updatedEmployee.id ? response.data : employee
                    )
                );
            })
            .catch((error) => {
                console.error(error);
            });
        // Clearing the editEmployee state to exit the editing mode
        setEditEmployee(null);
    };

    useEffect(() => {
        axios.get('http://localhost:3000/users').then(res =>
            setEmployees(res.data)
        ).catch(err => {
            console.error(err);
        });
    }, []);

    return (
        <>
            <div className="container mx-auto p-4 sm:p-0">
                <div className='flex justify-between items-center'>
                    <h1 className='text-4xl my-4'>Manage Employees</h1>
                    <label htmlFor="addemployee" className='btn-outline-primary  text-blue-500 hover:text-white h-full'>Add Employee</label>
                </div>
                <div>
                    <input type="checkbox" name="addemployee" id="addemployee" className='hidden peer' />
                    <div className='rounded bg-white max-h-0 overflow-hidden transition-all duration-300 ease-linear peer-checked:max-h-[500px] w-full'>
                        <CreateEmployee addEmployee={addEmployee} />
                    </div>
                </div>
                {editEmployee && (
                    <EditEmployee
                        employeeData={editEmployee}
                        updateEmployee={updateEmployee}
                        onCancel={cancelEdit}
                    />
                )}

                <table className="table-auto overflow-hidden rounded-md bg-head w-full my-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {employees.map((user) => (
                            <tr key={user.id} className='text-center'>
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">
                                    <span
                                        className={
                                            `${roleColors[user.role] || ''} rounded-md text-sm text-white p-1`
                                        }
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border">
                                    <button className='bg-rose-500 text-white rounded px-2 py-1' onClick={() => deleteUser(user.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white rounded px-2 py-1 ms-2"
                                        onClick={() => editEmployeeHandler(user)}
                                    >
                                        <i className="bi bi-pencil-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageEmployee;