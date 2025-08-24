// Reference: Yannick Assogba, TensorFlow.js — Handwritten digit recognition with CNNs
// https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/index.html
let state = 'ready'
let model
async function run() {  

  if (state === "ready") {
    state = 'training'
    console.log('starting training')
    model = getModel();
    await train(model);
    console.log('done training')
    state = 'prediction'
    doPrediction(model, 200)
  }
}

function getModel() {
    const model = tf.sequential();
    model.add(tf.layers.conv2d({
      inputShape: [28, 28, 1],
      kernelSize: 5,
      filters: 8,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'varianceScaling'
    }));
    model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
    model.add(tf.layers.conv2d({
      kernelSize: 5,
      filters: 16,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'varianceScaling'
    }));
    model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
    model.add(tf.layers.flatten());
    const NUM_OUTPUT_CLASSES = 2;
    model.add(tf.layers.dense({
      units: NUM_OUTPUT_CLASSES,
      kernelInitializer: 'varianceScaling',
      activation: 'softmax'
    }));
  
    const optimizer = tf.train.adam();
    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });
  
    return model;
  }

  async function train(model) {
    function onBatchEnd(batch,logs){
      big_canvas.addAccuracy(logs.acc)
    }
    const BATCH_SIZE = 62;
    const TRAIN_DATA_SIZE = 550;
    const TEST_DATA_SIZE = 100;

    const train_data = myp5.generateData(TRAIN_DATA_SIZE)
    const test_data = myp5.generateData(TEST_DATA_SIZE)

    const [trainXs, trainYs] = [tf.tensor(train_data[0].flat()).reshape([TRAIN_DATA_SIZE, 28, 28, 1]), tf.tensor(train_data[1].flat()).reshape([TRAIN_DATA_SIZE,2])]
    const [testXs, testYs] = [tf.tensor(test_data[0].flat()).reshape([TEST_DATA_SIZE, 28, 28, 1]),  tf.tensor(test_data[1].flat()).reshape([TEST_DATA_SIZE,2])]

    return model.fit(trainXs, trainYs, {
      batchSize: BATCH_SIZE,
      validationData: [testXs, testYs],
      epochs: 5,
      shuffle: true,
      callbacks: {onBatchEnd}
    });
  }
function doPrediction(model, testDataSize) {
  const testData = myp5.generateCreativeDate(testDataSize)
  const testxs = tf.tensor(testData[0].flat()).reshape([testDataSize, 28, 28, 1])
  const labels = testData[1]
  const lines = testData[2]
  const preds = model.predict(testxs).argMax(-1);
  testxs.dispose();
  big_canvas.addPrediction(Array.from(preds.dataSync()), labels, lines)
}