interface Navigator {
  gpu: GPU;
}

interface GPU {
  requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
  getPreferredCanvasFormat(): GPUTextureFormat;
}

interface GPUAdapter {
  requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
}

interface GPUDevice {
  createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
  createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
  createRenderPipeline(descriptor: GPURenderPipelineDescriptor): GPURenderPipeline;
  createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;
  createCommandEncoder(): GPUCommandEncoder;
  queue: GPUQueue;
}

interface GPUQueue {
  writeBuffer(buffer: GPUBuffer, offset: number, data: Float32Array): void;
  submit(commandBuffers: GPUCommandBuffer[]): void;
}

interface GPUBuffer {
  size: number;
  usage: GPUBufferUsageFlags;
}

interface GPUShaderModule {
  code: string;
}

interface GPURenderPipeline {
  getBindGroupLayout(index: number): GPUBindGroupLayout;
}

interface GPUBindGroupLayout {
  entries: GPUBindGroupLayoutEntry[];
}

interface GPUBindGroupLayoutEntry {
  binding: number;
  visibility: GPUShaderStageFlags;
  type: GPUBindingType;
}

interface GPUBindGroup {
  layout: GPUBindGroupLayout;
  entries: GPUBindGroupEntry[];
}

interface GPUBindGroupEntry {
  binding: number;
  resource: GPUBindingResource;
}

interface GPUBindingResource {
  buffer: GPUBuffer;
}

interface GPUCommandEncoder {
  beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder;
  finish(): GPUCommandBuffer;
}

interface GPURenderPassEncoder {
  setPipeline(pipeline: GPURenderPipeline): void;
  setBindGroup(index: number, bindGroup: GPUBindGroup): void;
  setVertexBuffer(slot: number, buffer: GPUBuffer): void;
  draw(vertexCount: number): void;
  end(): void;
}

interface GPUCommandBuffer {}

interface GPURenderPassDescriptor {
  colorAttachments: GPURenderPassColorAttachment[];
}

interface GPURenderPassColorAttachment {
  view: GPUTextureView;
  clearValue?: GPUColor;
  loadOp: GPULoadOp;
  storeOp: GPUStoreOp;
}

interface GPUTextureView {
  texture: GPUTexture;
  createView(): GPUTextureView;
}

interface GPUTexture {
  format: GPUTextureFormat;
}

interface GPUColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface GPUPrimitiveState {
  topology: GPUPrimitiveTopology;
  stripIndexFormat?: GPUIndexFormat;
  cullMode?: GPUCullMode;
  frontFace?: GPUFrontFace;
  unclippedDepth?: boolean;
}

type GPUBufferUsageFlags = number;
type GPUShaderStageFlags = number;
type GPUBindingType = 'uniform-buffer' | 'storage-buffer' | 'readonly-storage-buffer' | 'sampler' | 'sampled-texture' | 'multisampled-texture' | 'readonly-storage-texture' | 'writeonly-storage-texture' | 'depth-stencil-texture' | 'external-texture';
type GPULoadOp = 'clear' | 'load';
type GPUStoreOp = 'store' | 'discard';
type GPUTextureFormat = 'rgba8unorm' | 'rgba8unorm-srgb' | 'rgba8snorm' | 'rgba8uint' | 'rgba8sint' | 'rgba16uint' | 'rgba16sint' | 'rgba16float' | 'rgba32uint' | 'rgba32sint' | 'rgba32float' | 'bgra8unorm' | 'bgra8unorm-srgb' | 'bgra8snorm' | 'bgra8uint' | 'bgra8sint' | 'depth32float' | 'depth24plus' | 'depth24plus-stencil8' | 'stencil8';
type GPUPrimitiveTopology = 'point-list' | 'line-list' | 'line-strip' | 'triangle-list' | 'triangle-strip';
type GPUIndexFormat = 'uint16' | 'uint32';
type GPUCullMode = 'none' | 'front' | 'back';
type GPUFrontFace = 'ccw' | 'cw';

interface GPUCanvasContext {
  configure(configuration: GPUCanvasConfiguration): void;
  getCurrentTexture(): GPUTexture;
}

interface GPUCanvasConfiguration {
  device: GPUDevice;
  format: GPUTextureFormat;
  alphaMode: GPUCanvasAlphaMode;
}

type GPUCanvasAlphaMode = 'opaque' | 'premultiplied';

interface GPUShaderModuleDescriptor {
  code: string;
  label?: string;
}

interface GPURenderPipelineDescriptor {
  layout: 'auto' | GPUPipelineLayout;
  vertex: GPUVertexState;
  fragment?: GPUFragmentState;
  primitive?: GPUPrimitiveState;
}

interface GPUVertexState {
  module: GPUShaderModule;
  entryPoint: string;
  buffers?: GPUVertexBufferLayout[];
}

interface GPUFragmentState {
  module: GPUShaderModule;
  entryPoint: string;
  targets: GPUColorTargetState[];
}

interface GPUColorTargetState {
  format: GPUTextureFormat;
}

interface GPUCanvasConfiguration {
  device: GPUDevice;
  format: GPUTextureFormat;
  alphaMode?: 'opaque' | 'premultiplied';
}

interface GPUTexture {
  createView(descriptor?: GPUTextureViewDescriptor): GPUTextureView;
}

interface GPUTextureViewDescriptor {
  format?: GPUTextureFormat;
  dimension?: '1d' | '2d' | '2d-array' | 'cube' | 'cube-array' | '3d';
  aspect?: 'all' | 'stencil-only' | 'depth-only';
  baseArrayLayer?: number;
  arrayLayerCount?: number;
  baseMipLevel?: number;
  mipLevelCount?: number;
} 