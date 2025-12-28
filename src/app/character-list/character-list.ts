import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Characters, Character } from '../services/characters';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterList implements OnInit {
  title = 'Dragon Ball API';
  characters: Character[] = [];
  loading = true;
  error = '';

  constructor(
    private charactersService: Characters,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.charactersService.getCharacters(1, 20).subscribe({
      next: (response) => {
        this.characters = response.items;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener personajes:', err);
        this.error = 'Error al cargar los personajes';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
