import { Routes } from '@angular/router';
import { MainPage } from './domains/apod/pages/main-page/main-page';
import { DetailsPage } from './domains/apod/pages/main-page/details-page/details-page';


export const routes: Routes = [
    {
        path: "",
        component: MainPage
    },
    {
        path: "apod/:date",
        component: DetailsPage
    }
];
