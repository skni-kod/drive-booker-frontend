export interface User_Page {
    id: number;
    name: string;
    last_name: string;
    email: string;
    role: string;
    phone_number: string;
    voivodship: string;
    city: string;
    zip_code: string;
    street: string;
    house_number: string;

}

export interface User_CreditCard {
    card_first_name: string;
    card_last_name: string;
    card_number: string;
    card_expiry_date: string;
    card_cvv: string;
}