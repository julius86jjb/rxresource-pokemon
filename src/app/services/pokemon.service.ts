import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, linkedSignal, signal, WritableSignal } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import type { PokeapiResponse, Pokemon } from '../interfaces/pokeapi.response';
import { rxResource } from '@angular/core/rxjs-interop'


@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  private http = inject(HttpClient);

  currentPage = signal<number>(0);

  selectedPokemon = signal<Pokemon | undefined>(undefined);


  private pokemonsResource = rxResource({
    request: () => ({
      page: this.currentPage()
    }),
    loader: ({ request }) =>
      this.http.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${request.page * 20}`)
        .pipe(
          delay(2000),
          tap(console.log)
        )

  })

  pokemons = computed(() => this.pokemonsResource.value().results ?? [] as Pokemon[])

  // Si necesitaramos que fuera "writable signal":
  pokemonsWritable = linkedSignal(() => this.pokemonsResource.value().results ?? [] as Pokemon[] )

  isLoading = this.pokemonsResource.isLoading;

  loadNextPage() {
    this.currentPage.update((page) => page + 1);
    this.selectedPokemon.set(undefined)
  }



}
