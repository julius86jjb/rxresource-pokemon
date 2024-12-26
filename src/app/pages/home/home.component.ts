import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule
  ],
  templateUrl: './home.component.html',
})
export default class HomeComponent {

  private pokemonService = inject(PokemonService);

  pokemons = this.pokemonService.pokemons;
  isLoading = this.pokemonService.isLoading;
  selectedPokemon = this.pokemonService.selectedPokemon;
  currentPage = this.pokemonService.currentPage;

  selectedPokemonName = computed(() => this.selectedPokemon() ? this.selectedPokemon()!.name : 'No pokemon selected')

  onLoadNextPage() {
    this.pokemonService.loadNextPage();
  }
}
