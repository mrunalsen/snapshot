import { lazy, Suspense } from 'react';
import {
    Route,
    Routes
} from "react-router-dom";
import Loader from '../../../shared/Loader';
import Login from '../../components/login/Login';
const Home = lazy(() => import('../../../components/Home'));
const Admin = lazy(() => import('../../../components/Admin'));
const Signup = lazy(() => import('../../components/login/Signup'));
const FormContainer = lazy(() => import('../../../components/forms/createForm/FormContainer'));
const FormList = lazy(() => import('../../../components/formlist/Formlist'));
const FormQuestions = lazy(() => import('../../../components/formlist/FormQuestions'));
const ManageEmployee = lazy(() => import('../../../components/manageEmployee/ManageEmployee'));

const Routing = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                {/* Start : Routing paths */}
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/create' element={<FormContainer />} />
                    <Route path='/manage' element={<ManageEmployee />} />
                    <Route path='/formlist' element={<FormList />} />
                    <Route path="/forms/:id" element={<FormQuestions />} />
                </Routes>
                {/* End : Routing paths */}
            </Suspense>
        </>
    );
};

export default Routing;