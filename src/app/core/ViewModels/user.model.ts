
export interface UserViewModel {
    userId :string;
    UserBasicDetails : UserbasicDetails;
    UserCredentials :userCredentialDetails;
    UserMenuDetails : userMenuDetails;    
    createdBy: string;
    createdAt: Date;
    modifiedBy: string;
    modifiedAt: Date;
}

interface designationDetails{
    designationId : string;
    designationName : string
}

interface UserbasicDetails {
    User_FirstName :string;
    User_MiddleName : string;
    User_LastName :string;
    User_Email :string;
    User_PhoneNumber :string;
    User_Designation : string
    User_Country :string;
    User_State :string;
    User_PostalCode: string;
    User_DateOfBirth : Date
    User_Type :string
}

interface userCredentialDetails{
    Username : string;
    PasswordHash : string;
    PasswordChanged: number;    
}

interface userMenuDetails {
    AssingedMenuCodes :string;
}

