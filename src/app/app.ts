import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private charactersService: Characters,
    private cdr: ChangeDetectorRef
  ) {
    console.log('Constructor ejecutado');
  }

  ngOnInit() {
    console.log('ngOnInit ejecutado - loading:', this.loading);
    this.charactersService.getCharacters(1, 20).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        this.characters = response.items;
        this.loading = false;
        this.cdr.detectChanges(); // Forzar detección de cambios
        console.log(`${this.characters.length} personajes cargados - loading:`, this.loading);
      },
      error: (err) => {
        console.error('Error al obtener personajes:', err);
        this.error = 'Error al cargar los personajes';
        this.loading = false;
        this.cdr.detectChanges(); // Forzar detección de cambios
      }
    });
  }
}
