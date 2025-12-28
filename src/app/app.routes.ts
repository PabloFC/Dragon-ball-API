import { Routes } from '@angular/router';
import { CharacterList } from './character-list/character-list';
import { CharacterDetail } from './character-detail/character-detail';

export const routes: Routes = [
  { path: '', component: CharacterList },
  { path: 'character/:id', component: CharacterDetail },
];
