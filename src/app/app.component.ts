import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { questionList } from './helper/questions-list';
import { Question } from './models/question.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gsap-quote-intro';

  @ViewChild('slider', { static: true }) slider!: ElementRef<HTMLDivElement>;
  @ViewChild('questionContainer', { static: true })
  questionContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('answer', { static: true }) answer!: ElementRef<HTMLDivElement>;
  @ViewChild('menu', { static: true }) menu!: ElementRef<HTMLDivElement>;
  @ViewChild('logo', { static: true }) logo!: ElementRef<HTMLDivElement>;
  @ViewChild('search', { static: true }) search!: ElementRef<HTMLDivElement>;
  @ViewChild('main', { static: true }) main!: ElementRef<HTMLDivElement>;
  @ViewChild('actions', { static: true }) actions!: ElementRef<HTMLDivElement>;
  @ViewChild('progress', { static: true }) progress!: ElementRef<HTMLDivElement>;

  currentQuestionIndex = 0;
  progressValue!: number;
  questions = questionList;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initAnimations();
    this.increaseProgress();
  }

  initAnimations(): void {
    gsap.from(this.main.nativeElement, {
      delay: 0.2,
      duration: 0.4,
      opacity: 0,
      y: -20
    });

    gsap.from(this.questionContainer.nativeElement.childNodes, {
      delay: 0.5,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15
    });
    gsap.from(this.menu.nativeElement.childNodes, {
      delay: 0.4,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.search.nativeElement.childNodes, {
      delay: 0.8,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.logo.nativeElement.childNodes, {
      delay: 0.3,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
    gsap.from(this.actions.nativeElement.childNodes, {
      delay: 0.6,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
    gsap.from(this.progress.nativeElement.childNodes, {
      delay: 0.7,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });

  }

  increaseProgress(): void {
    this.progressValue = (100 * (this.currentQuestionIndex + 1)) / this.questions.length;
    if (this.currentQuestionIndex === 0) {
      gsap.to(this.slider.nativeElement, {
        delay: 0.7,
        duration: 0.6,
        width: `${this.progressValue}%`
      });
    } else {
      gsap.to(this.slider.nativeElement, {
        duration: 0.6,
        width: `${this.progressValue}%`
      });
    }
  }

  get question(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  prev(): void {
    if (this.currentQuestionIndex > 0) {
      gsap.to(this.questionContainer.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
          if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.increaseProgress();
            this.cdr.detectChanges();
            gsap.to(this.questionContainer.nativeElement.childNodes, {
              duration: 0.4,
              opacity: 1,
              y: 0,
              stagger: 0.15,
            });
          }
        }
      })
    }
  }

  onSelect(answer: HTMLDivElement): any {
    this.answer?.nativeElement.childNodes.forEach((node: HTMLDivElement | any) => {
      if (node.classList && node.classList.contains('selected')) {
        node.classList.remove('selected');
      }
    });
    answer.classList.add('selected');
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      gsap.to(this.questionContainer.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
            this.currentQuestionIndex++;
            this.increaseProgress();
            this.cdr.detectChanges();
            gsap.to(this.questionContainer.nativeElement.childNodes, {
              duration: 0.4,
              opacity: 1,
              y: 0,
              stagger: 0.2,
            });
        }
      });
    } else if (this.currentQuestionIndex = this.questions.length) {
      gsap.to(this.questionContainer.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
            this.currentQuestionIndex = 0;
            this.increaseProgress();
            this.cdr.detectChanges();
            gsap.to(this.questionContainer.nativeElement.childNodes, {
              duration: 0.4,
              opacity: 1,
              y: 0,
              stagger: 0.2,
            });
        }
      });
    }
  }

}
