export class EmployeeModel {
    payload: SectionModel[];
}

export class SectionModel {
    name: string;
    expanded: boolean;
    cardItems: CardItemModel[];
}

export class CardItemModel {
    data: EmployeeDataModel | CourseModel[] | AcademicFormationModel[] | LanguageModel[] | JobHistoryModel[];
}

export class EmployeeDataModel {
    employeeName: string;
    jobName: string;
    birthDate: string;
    companyAdmissionDate: string;
    cellphoneNumber: string;
    email: string;
}

export class CourseModel {
    courseName: string;
    entity: string;
    period: string;
}

export class AcademicFormationModel {
    period: string;
    course: string;
    local: string;
    educationLevel?: string;
}

export class LanguageModel {
    language: string;
    status: string;
    period: string;
}

export class JobHistoryModel {
    job: string;
    period: string;
    company: string | null;
}
