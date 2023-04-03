import { Dimensions } from "react-native";

export interface ImageObject {
    id: number;
    image_name: string;
    tour_id: number;
    active: boolean;
}

export interface Category {
    id: number;
    name: string;
    parent_id: number | null;
    created_at: Date;
    deleted_at: Date | null;
    updated_at: Date;
    tours: Array<Tour>;
    subcategories: Array<Category>;
}

export interface Operator {
    id: number;
    legal_name: string;
    legal_address: string;
}

export interface Schedule {
    id: number;
    active: boolean;
    created_at: Date;
    dateForHumans: number;
    deleted_at: Date | null;
    enddate: string;
    hoursForHumans: number;
    is_plan: boolean;
    meet_place: string;
    operator_guide_id: number | null;
    price: number;
    space_current: number;
    space_total: number;
    startdate: string;
    tour_id: number;
    updated_at: Date;
}

export interface Tour {
    id: number;
    title: string;
    accommodation: string;
    active: boolean;
    category_id: number;
    description: string;
    operator: Operator;
    schedules: Array<Schedule> | null;
    location: string;
    images: Array<ImageObject> | null;
    deleted_at: Date;
    updated_at: Date;
    created_at: Date;

}

export interface TourPreview {
    id: number;
    title: string;
    category: Category;
    subcategory: Category;
    image: ImageObject | null;
    operator: Operator;
    lower_price: number;
    expensive_price: number;
}

export const DEVICE_WIDTH = Dimensions.get('window').width;