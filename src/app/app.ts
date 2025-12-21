import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Characters, Character } from './services/characters';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Dragon Ball API';
  characters: Character[] = [];
  loading = true;
  error = '';

  constructor(private charactersService: Characters) {}

  ngOnInit() {
    this.charactersService.getCharacters(1, 20).subscribe({
      next: (response) => {
        this.characters = response.items;
        this.loading = false;
        console.log(`${this.characters.length} personajes cargados`);
      },
      error: (err) => {
        console.error('Error al obtener personajes:', err);
        this.error = 'Error al cargar los personajes';
        this.loading = false;
      }
    });
  }
}
