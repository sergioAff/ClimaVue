/*
 * Public API Surface of shared
 */
export { BodyComponent } from './infrastructure/ui/layouts/body/body.component';
export { StateFactory } from './domain/state/state.factory';
export type { INavRouter } from './domain/model/navRouter.model';
export { LogoComponent } from './infrastructure/ui/components/logo/logo.component';
export { NavComponent } from './infrastructure/ui/components/nav-home/nav.component';
export { SearchInputComponent } from './infrastructure/ui/components/search-input/search-input.component';
export type { WeatherCard } from './domain/model/weatherCard.model';
export { WeatherCardComponent } from './infrastructure/ui/components/weather-card/weather-card.component';
export { environment } from './environment/environment';
export * from './infrastructure/ui/components/loading-spinner/loading-spinner.component'; 