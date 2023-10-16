interface Question {
    question: string;
    required: boolean;
}

interface Form {
    [formName: string]: Question[];
}

interface FormData {
    forms: Form[];
}

interface Employee {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    submittedForms: string[];
}
interface CreateEmployee {
    name: string;
    email: string;
    password: string;
    role: string;
    submittedForms: string[];
}

// Type for EmployeeForm component
interface FormsData {
    id: string;
    name: string;
    project: string;
    reviewer: string;
    data: {
        // Dynamic index signature
        [key: string]: string;
    };
};