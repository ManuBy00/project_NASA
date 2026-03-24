import { Routes } from '@angular/router';
import { MainPage } from './domains/apod/pages/main-page/main-page';
import { DetailsPage } from './domains/apod/pages/details-page/details-page';
import { Favourites } from './domains/apod/pages/favourites/favourites';
import { About } from './domains/apod/pages/about/about';


export const routes: Routes = [
    {
        path: "",
        component: MainPage,
        pathMatch: 'full'
    },

    {
        path: "about",
        component: About,
        pathMatch: 'full'

    },

    {
        path: "apod/favourites",
        component: Favourites
    },
    
    {
        path: "apod/:date",
        component: DetailsPage
    },

];
