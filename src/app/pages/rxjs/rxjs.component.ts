import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscribable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  susbscription: Subscription;

  constructor() {

    this.susbscription = this.regresaObservable()
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error ),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.susbscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        //if ( contador === 3) {
        //  clearInterval( intervalo);
        //  observer.complete();
        // }


        // if ( contador === 2) {
        //  observer.error('Auxilio');
        //}

      }, 1000 );


    }).pipe(

      map( resp => resp.valor ),
      filter( ( valor, index) => {

        if ( (valor % 2) === 1 ) {
          //impar
          return true;

        } else {
          //par
          return false;
        }
        
      })

    );

  }

}
