const sample = [
    {
      language: 'Rust',
      value: 78.9,
      color: '#000000'
    },
    {
      language: 'Kotlin',
      value: 75.1,
      color: '#00a2ee'
    },
    {
      language: 'Python',
      value: 68.0,
      color: '#fbcb39'
    },
    {
      language: 'TypeScript',
      value: 67.0,
      color: '#007bc8'
    },
    {
      language: 'Go',
      value: 65.6,
      color: '#65cedb'
    },
    {
      language: 'Swift',
      value: 65.1,
      color: '#ff6e52'
    },
    {
      language: 'JavaScript',
      value: 61.9,
      color: '#f9de3f'
    },
    {
      language: 'C#',
      value: 60.4,
      color: '#5d2f8e'
    },
    {
      language: 'F#',
      value: 59.6,
      color: '#008fc9'
    },
    {
      language: 'Clojure',
      value: 59.6,
      color: '#507dca'
    }
  ];

const margin = 60;
const width = 1000 
const height = 600

const svg = d3.select('svg')
.attr('width', width + 2*margin)
.attr('height', height + 2 * margin)

const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);


const yScale = d3.scaleLinear()
    .domain([0,100])
    .range([height, 0])

chart.append('g')
    .call(d3.axisLeft(yScale))

const xScale = d3.scaleBand()
    .domain(sample.map(s=>s.language))
    .range([0, width])
    .padding(0.4)

chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))

chart.selectAll()
  .data(sample)
  .enter()
  .append('rect')
  .attr('x', s=>xScale(s.language))
  .attr('y', s=> yScale(s.value))
  .attr('height', s=> height - yScale(s.value))
  .attr('width', xScale.bandwidth())
  .on('mouseover', function(actual, i) {
    d3.select(this).attr('opacity', 0.7)
  })
  .on('mouseout', function() {
    d3.select(this).attr('opacity', 1)
  })

  //vertical grid lines
//   chart.append('g')
//     .attr('class', 'grid')
//     .attr('transform', `translate(0,${height})`)
//     .call(d3.axisBottom().scale(xScale).tickSize(-height,0,0).tickFormat(''))

//horizontal grid lines
chart.append('g')
  .attr('class', 'grid')
  .call(d3.axisLeft().scale(yScale).tickSize(-width,0,0).tickFormat(''))


//adding labels 
svg.append('text')
  .attr('x', -(height/2)-margin)
  .attr('y', margin /2.4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('Love Meter (%)')

svg.append('text')
  .attr('x', width/2 + margin)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .text('Most loved programming languages in 2018')
  

  svg.append('text')
  .attr('x', width/2 + margin)
  .attr('y', height + margin *1.6)
  .attr('text-anchor', 'middle')
  .text('Languages')


