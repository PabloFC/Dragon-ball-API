import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Characters, Character } from '../services/characters';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.css',
})
export class CharacterDetail implements OnInit {
  character: Character | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private charactersService: Characters,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Character ID:', id);
    if (id) {
      this.charactersService.getCharacterById(parseInt(id)).subscribe({
        next: (character) => {
          console.log('Character loaded:', character);
          this.character = character;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error completo:', err);
          this.error = 'Error al cargar el personaje';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      console.error('No ID found in route');
      this.error = 'ID de personaje no encontrado';
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
