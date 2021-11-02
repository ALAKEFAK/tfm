import Vue from 'vue';
import {Chart, registerables} from 'chart.js';
import {GameModel} from '../models/GameModel';

Chart.register(...registerables);
Chart.defaults.font.size = 20;
Chart.defaults.color = 'rgb(240, 240, 240)';

export const GlobalParamChart = Vue.component('global-param-chart', {
  data: function() {
    return {};
  },
  props: {
    game: {
      type: Object as () => GameModel,
    },
    animation: {
      type: Boolean,
    },
  },
  methods: {
    hasEnoughData: function(): Boolean {
      if (this.game.gameOptions.turmoilExtension) {
        return this.game.generation === this.game.rulingPartiesRecord.length && this.game.generation === this.game.tempRecord.length;
      } else {
        return this.game.generation === this.game.tempRecord.length;
      }
    },
    getLabels: function(): Array<string> {
      return Array.from({length: this.game.generation}, (_, index) => this.getGenerationLabel(index));
    },
    getGenerationLabel: function(index: number): string {
      if (this.game.gameOptions.turmoilExtension === false) {
        return `${index+1}`;
      } else {
        return `${index+1} [` + this.game.rulingPartiesRecord[index] + ']';
      }
    },
    renderChart: function(): void {
      const ctx = document.getElementById('paramChart') as HTMLCanvasElement;
      if (ctx !== null) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['0', ...this.getLabels()],
            datasets: [
              {
                label: 'Temperature',
                data: [-30, ...this.game.tempRecord],
                borderColor: 'rgb(153, 17, 0)',
                backgroundColor: 'rgb(153, 17, 0)',
                yAxisID: 'ytemp',
                tension: 0.1,
                pointRadius: 6,
              },
              {
                label: 'Oxygen',
                data: [0, ...this.game.oxygenRecord],
                borderColor: 'rgb(0, 153, 0)',
                backgroundColor: 'rgb(0, 153, 0)',
                yAxisID: 'yoxygen',
                tension: 0.1,
                pointRadius: 6,
              },
              {
                label: 'Ocean',
                data: [0, ...this.game.oceanRecord],
                borderColor: 'rgb(0, 102, 255)',
                backgroundColor: 'rgb(0, 102, 255)',
                yAxisID: 'yocean',
                tension: 0.1,
                pointRadius: 6,
              },
              {
                label: 'Venus',
                data: [0, ...this.game.venusRecord],
                borderColor: 'rgb(170, 170, 0)',
                backgroundColor: 'rgb(170, 170, 0)',
                yAxisID: 'yvenus',
                hidden: this.game.gameOptions.venusNextExtension === false,
                tension: 0.1,
                pointRadius: 6,
              },
            ],
          },
          options: {
            animation: {
              duration: this.animation ? 1000 : 0,
              easing: 'linear',
            },
            plugins: {
              title: {
                display: true,
                text: 'Global Parameters',
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              ytemp: {
                title: {text: 'Temperature', display: false},
                min: -30,
                max: 8,
                ticks: {
                  stepSize: 2,
                  display: false,
                },
                grid: {color: 'rgb(90, 90, 90'},
              },
              yoxygen: {
                title: {text: 'Oxygen', display: false},
                min: 14,
                max: 0,
                ticks: {
                  stepSize: 1,
                  display: false,
                },
                grid: {color: 'rgb(90, 90, 90'},
              },
              yocean: {
                title: {text: 'Ocean', display: false},
                min: 9,
                max: 0,
                ticks: {
                  stepSize: 1,
                  display: false,
                },
                grid: {color: 'rgb(90, 90, 90'},
              },
              yvenus: {
                title: {text: 'Venus', display: false},
                min: 30,
                max: 0,
                ticks: {
                  stepSize: 2,
                  display: false,
                },
                grid: {color: 'rgb(90, 90, 90'},
              },
              x: {
                title: {text: this.game.gameOptions.turmoilExtension ? 'Generation [Ruling Party]' : 'Generation', display: true},
                offset: true,
              },
            },
          },
        });
      }
    },
  },
  mounted() {
    this.renderChart();
  },
  template: `
    <div class="score-chart-container" v-if="hasEnoughData()">
      <div></div>
        <canvas id="paramChart"></canvas>
      <div></div>
    </div>
    `,
});
